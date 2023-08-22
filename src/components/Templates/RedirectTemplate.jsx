import React, { Suspense, useState } from 'react'
import Header from '../header/Header'
import Editor from '../carouselItems/Editor';
import { useTranslation } from 'react-i18next';
const Sidebar = React.lazy(() => import('../sidebar/Sidebar'))

function RedirectTemplate() {
   const [sidebarToggler, setSidebarToggler] = useState(false);
   const {t} = useTranslation()
   return (
      <>
         <Header
            sidebarToggler={sidebarToggler}
            setSidebarToggler={setSidebarToggler}
         />
         <div className="main__wrapper--app">
            <Suspense fallback={<p className='text-center'>{t('loading')}</p>}>
               <Sidebar sidebarToggler={sidebarToggler} />
            </Suspense>
            <div className="col-md-12 col-lg-6">
              <Editor/>
            </div>
         </div>
      </>
   )
}

export default RedirectTemplate