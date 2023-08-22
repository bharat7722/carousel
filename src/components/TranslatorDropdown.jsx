import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useTranslation } from "react-i18next";

const TranslatorDropdown = () => {
  const [selected, setselected] = useState({
    code:"en",
    label:"English",
    img:"images/icons/flags/1.png"
  })
  const {t,i18n} = useTranslation()
  const changeLanguageHandler = () => {
    i18n.changeLanguage(selected.code);
  }

  useEffect(() => {
    changeLanguageHandler()
  }, [selected])
  
  return (
    <div className="translator__dropdown--wrapper">
      <div>
        <img src={selected.img} alt="" class="mr-2" /> {selected.code.toUpperCase()}
      </div>
      <ul class="menu-sub menu-drop">
        <li class="menu-item" onClick={(e) => setselected({...selected,code:"en",img:"images/icons/flags/1.png","label":"English"})}>
          <img src="images/icons/flags/1.png" alt="" class="mr-2" />
          English
        </li>
        <li class="menu-item" onClick={(e) => setselected({...selected,code:"fr",img:"images/icons/flags/5.png","label":"French"})}>
          <img src="images/icons/flags/5.png" alt="" class="mr-2" />
          French
        </li>
        <li class="menu-item" onClick={(e) => setselected({...selected,code:"es",img:"images/icons/flags/3.png","label":"Spanish"})}>
          <img src="images/icons/flags/3.png" alt="" class="mr-2" />
          Spanish
        </li>
        {/* <li class="menu-item">
          <img src="images/icons/flags/2.png" alt="" class="mr-2" />
          German
        </li>
        <li class="menu-item">
          <img src="images/icons/flags/4.png" alt="" class="mr-2" />
          Italian
        </li>
        <li class="menu-item">
          <img src="images/icons/flags/6.png" alt="" class="mr-2" />
          Chinese
        </li>
        <li class="menu-item">
          <a href="#!" class="menu-link nav-link">
            <img src="images/icons/flags/7.png" alt="" class="mr-2" />
            Japanese
          </a>
        </li>
        <li class="menu-item">
          <img src="images/icons/flags/8.png" alt="" class="mr-2" />
          Korean
        </li>
        <li class="menu-item">
          <img src="images/icons/flags/9.png" alt="" class="mr-2" />
          Indonesian
        </li>
        <li class="menu-item">
          <img src="images/icons/flags/10.png" alt="" class="mr-2" />
          Turkish
        </li> */}
      </ul>
    </div>
  );
};

export default TranslatorDropdown;
