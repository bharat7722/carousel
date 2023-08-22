import React, { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import ForgetPassword from "../ForgetPassword";
import { useTranslation } from "react-i18next";

const Auth = () => {
	const [pageType, setPageType] = useState("signIn");
	const {t} = useTranslation()
	return (
		<div className="page__container--wrapper">
			<Container>
				<Row className="flex-column gy-5">
					<Col md={12} lg={6} className="mx-auto">
						<div className="logo mx-auto">
							<img
								src="./images/0-logo_1c4d7abc-08ad-41e3-bfcd-b0f37c1df43c.png"
								alt="logo"
								className="img-fluid"
							/>
						</div>
					</Col>
					<Col md={12} lg={6} className="mx-auto">
						<div className="box">
							<div className="box-header">
								<h3>
									{pageType === "signIn"
										? t('login')
										: pageType === "signUp"
											? t('register')
											: t('forget-pass')
											}
								</h3>
								{pageType === "forgetPassword" && (
									<p>
										{t('forget-pass-desc')}
									</p>
								)}
							</div>
							<div className="box-body">
								{pageType === "signIn" ? (
									<SignIn />
								) : pageType === "signUp" ? (
									<SignUp setPageType={setPageType} />
								) : (
									<ForgetPassword setPageType={setPageType} />
								)}
							</div>
							<div className="text-center mt-3">
								{pageType !== "forgetPassword" && pageType !== "signUp" && (
									<>
										<p className="m-0 fs-sm">
											<span
												className="link"
												onClick={() => setPageType("forgetPassword")}
											>
												{t('forget-pass')}
											</span>
										</p>
										<p className="m-0 fs-sm">
											{t('account-not-available')}{" "}
											<span
												className="link"
												onClick={() => setPageType("signUp")}
											>
												{t('signup')}
											</span>
										</p>
									</>
								)}
								{pageType === "signUp" && (
									<p className="m-0 fs-sm">
										{t('already-account')}{" "}
										<span
											className="link"
											onClick={() => setPageType("signIn")}
										>
											{t('signin')}
										</span>
									</p>
								)}
							</div>
						</div>
					</Col>
				</Row>
			</Container>
		</div>
	);
};

export default Auth;
