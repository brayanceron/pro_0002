import { useEffect } from 'react'
import { Route, Routes } from "react-router"
import GetView from './routes/GetView'

import type { IStaticMethods } from 'flyonui/flyonui'
// import GetSong from './routes/song/GET';
import GetSong from './routes/song/GET/GET';

// import GetGeneric from './routes/generic/GET'
import GetGeneric from './routes/generic/GET'
import GetIdGeneric from './routes/generic/GETID'
import PostGeneric from './routes/generic/POST'


import DashboardLayout from './DashboardLayout'
import Playing from './routes/Playing'
import GETBY from './routes/song/GETBY'
import PostSong from './routes/song/POST'
import GETID from './routes/song/GETID';
import { Generate } from './routes/Generate';
// import PostGender from './routes/gender/POST'

// import {GET as GETUSER} from './routes/user/GET'
import GETIDUSER from './routes/user/GETID'

import './App.css'
import { Login } from './routes/Login';
import { SignUp } from './routes/SignUp';
// import AuthProvider from './context/AuthProvider';
import { ProtectedRoute } from './auth/ProtectedRoute';
import { ProtectedLogin } from './auth/ProtectedLogin';

declare global {
  interface Window {
    HSStaticMethods: IStaticMethods;
  }
}

function App() {

  useEffect(() => {
    const loadFlyonui = async () => {
      await import('flyonui/flyonui');
      window.HSStaticMethods.autoInit();
    };
    loadFlyonui();
  }, [location.pathname]);

  return (
    // <AuthProvider>
      <Routes>
        <Route path='/' element={<h1>Hello world, root path</h1>}></Route>

        {/* <ProtectedRoute> */}
        {/* <Route element={<DashboardLayout />}> */}
        <Route element={<ProtectedRoute><DashboardLayout /></ProtectedRoute>}>
          <Route path='/getview' element={<GetView />}></Route>

          <Route path='/playing' element={<Playing />}></Route>
          <Route path='/generate' element={<Generate />}></Route>

          <Route path='song'>
            <Route path='get' element={<GetSong />} />
            <Route path='post' element={<PostSong />} />
            <Route path='get/:id' element={<GETID />} />
            <Route path='get/by/:criterion/:value' element={<GETBY />} /> // INFO this route is not complete
            {/* <Route path='getby' element={<GETBY />} /> */}
          </Route>

          <Route path='gender'>
            <Route path='get' element={<GetGeneric entity='gender' />} />
            <Route path='get/:id' element={<GetIdGeneric entity='gender' />} />
            <Route path='post' element={<PostGeneric entity='gender' {...optDef.gender} />} />
          </Route>

          <Route path='language'>
            <Route path='get' element={<GetGeneric entity='language' />} />
            <Route path='get/:id' element={<GetIdGeneric entity='language' />} />
            <Route path='post' element={<PostGeneric entity='language' {...optDef.language} />} />
          </Route>

          <Route path='playlist'>
            <Route path='get' element={<GetGeneric entity='playlist' />} />
            <Route path='get/:id' element={<GetIdGeneric entity='playlist' />} />
            <Route path='post' element={<PostGeneric entity='playlist' {...optDef.playlist} />} />
          </Route>

          <Route path='sense'>
            <Route path='get' element={<GetGeneric entity='sense' />} />
            <Route path='get/:id' element={<GetIdGeneric entity='sense' />} />
            <Route path='post' element={<PostGeneric entity='sense' {...optDef.sense} />} />
          </Route>

          <Route path='singer'>
            <Route path='get' element={<GetGeneric entity='singer' />} />
            <Route path='get/:id' element={<GetIdGeneric entity='singer' />} />
            <Route path='post' element={<PostGeneric entity='singer' {...optDef.singer} />} />
          </Route>

          <Route path='user'>
            <Route path='get/' element={<GETIDUSER />} />
            <Route path='get/:id' element={<GETIDUSER />} />
          </Route>

        </Route>
        {/* </ProtectedRoute> */}

        <Route path='/login' element={<ProtectedLogin><Login /></ProtectedLogin>} />
        <Route path='/signup' element={<ProtectedLogin><SignUp /></ProtectedLogin>} />

      </Routes >

)
{/* </AuthProvider> */}
}


const optDef = {
  gender: {
    nameOpt: { label: "Gender Name", icon: "music-share", },
    descriptionOpt: { label: "Gender Description" }
  },
  language: {
    nameOpt: { label: "Language Name", icon: "language", },
    descriptionOpt: { label: "Language Description", },
  },
  playlist: {
    nameOpt: { label: "PlayList Name", icon: "playlist", },
    descriptionOpt: { label: "PlayList Description", helper: "PlayList, group musical, band description", },
  },
  sense: {
    nameOpt: { label: "Sense Name", icon: "mood-happy" },
    descriptionOpt: { label: "Sense Description", helper: "Describe how this emotion makes you feel" },
  },
  singer: {
    nameOpt: { label: 'Singer Name', icon: 'mood-sing' },
    descriptionOpt: { label: 'Singer Description', helper: 'Singer, group musical, band description' },
  }
}

export default App
