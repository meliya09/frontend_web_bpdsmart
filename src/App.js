import React from 'react';
import './App.css';
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Signin from './Pages/Signin';
import Dashboard from './Dashboard/Dashboard';
import ProdukKonven from './ProdukKonvensional/ProdukKonven';
import ProdukKonvenCreate from './ProdukKonvensional/ProdukKonvenCreate';
import ProdukKonvenUpdate from './ProdukKonvensional/ProdukKonvenUpdate';
import DanaKonven from './DanaKonven/DanaKonven';
import Kredit from './Kredit/Kredit';
import DetailKredit from './DetailKredit/DetailKredit';
import KreditProduktif from './KreditProduktif/KreditProduktif';
import DetailKreditProduktif from './DetailKreditProduktif/DetailKreditProduktif';
import KreditKonsumer from './KreditKonsumer/KreditKonsumer';
import DetailKreditKonsumer from './DetailKreditKonsumer/DetailKreditKonsumer';
import KreditStandar from './KreditStandar/KreditStandar';
import DetailKreditStandar from './DetailKreditStandar/DetailKreditStandar';
import KreditProgram from './KreditProgram/KreditProgram';
import DetailKreditProgram from './DetailKreditProgram/DetailKreditProgram';
import ProdukSyariah from './ProdukSyariah/ProdukSyariah';
import Informasi from './Informasi/Informasi';
import Internal from './Internal/Internal';
import DetailInternal from './DetailInternal/DetailInternal';
import DetailInternalUpdate from './DetailInternal/DetailInternalUpdate';
import DetailInternalInfo from './DetailInternal/DetailInternalInfo';
import StdLayanan from './StdLayanan/StdLayanan';
import DetailStdLayanan from './DetailStdLayanan/DetailStdLayanan';
import BdyKerja from './BdyKerja/BdyKerja';
import DetailBdyKerja from './DetailBdyKerja/DetailBdyKerja';
import IdentitasPribadi from './IdentitasPribadi/IdentitasPribadi';
import DetailIdentitasPribadi from './DetailIdentitasPribadi/DetailIdentitasPribadi';
import StandarLayanan from './StandarLayanan/StandarLayanan';
import DetailStandarLayanan from './DetailStandarLayanan/DetailStandarLayanan';
import Helpdesk from './Helpdesk/Helpdesk';
import Home from './Home/Home';
import JasaKonven from './JasaKonven/JasaKonven';
import DetailJasaKonven from './DetailJasaKonven/DetailJasaKonven';
import KirimanUangKonven from './KirimanUangKonven/KirimanUangKonven';
import DetailKirimanUangKonven from './DetailKirimanUangKonven/DetailKirimanUangKonven';
import TabKonven from './TabKonven/TabKonven';
import TabKonvenCreate from './TabKonven/TabKonvenCreate';
import DetailTabKonven from './DetailTabKonven/DetailTabKonven';
import GiroKonven from './GiroKonven/GiroKonven';
import DetailGiroKonven from './DetailGiroKonven/DetailGiroKonven';
import DepositoKonven from './DepositoKonven/DepositoKonven';
import DetailDepoKonven from './DetailDepoKonven/DetailDepoKonven';
import Level from './Level/Level';
import DivisiUpdate from './Level/DivisiUpdate';
import PrivilegeDataDivisi from './PrivilegeDivisi/PrivilegeDataDivisi';



// syariah
import DanaSyariah from './DanaSyariah/DanaSyariah';
import Pembiayaan from './Pembiayaan/Pembiayaan';
import DetailPembiayaan from './DetailPembiayaan/DetailPembiayaan';
import JasaSyariah from './JasaSyariah/JasaSyariah';
import DetailJasaSyariah from './DetailJasaSyariah/DetailJasaSyariah';
import TabSyariah from './TabSyariah/TabSyariah';
import DetailTabSyariah from './DetailTabSyariah/DetailTabSyariah';
import GiroSyariah from './GiroSyariah/GiroSyariah';
import DetailGiroSyariah from './DetailGiroSyariah/DetailGiroSyariah';
import DepositoSyariah from './DepositoSyariah/DepositoSyariah';
import DetailDepoSyariah from './DetailDepoSyariah/DetailDepoSyariah';
import ModalKerja from './ModalKerja/ModalKerja';
import DetailModalKerja from './DetailModalKerja/DetailModalKerja';
import Investasi from './Investasi/Investasi';
import DetailInvestasi from './DetailInvestasi/DetailInvestasi';
import KirimanUangSyariah from './KirimanUangSyariah/KirimanUangSyariah';
import DetailKirimanUangSyariah from './DetailKirimanUangSyariah/DetailKirimanUangSyariah';


import JaringanLayanan from './JaringanPelayanan/JaringanLayanan';
import DetailLokasiLayanan from './DetailLokasiLayanan/DetailLokasiLayanan';
import DetailLokasiLayananUpdate from './DetailLokasiLayanan/DetailLokasiLayananUpdate';
import LokasiATM from './LokasiATM/LokasiATM';
import DetailLokasiATM from './DetailLokasiATM/DetailLokasiATM';

import StrukturMenu from './StrukturMenu/StrukturMenu';
import Stafs from './Stafs/Stafs';
import UserUpdate from './Stafs/UserUpdate';

import KonvenUpdateContent from './ProdukKonvensional/KonvenUpdateContent';
import DanaKonUpdateContent from './DanaKonven/DanaKonUpdateContent';
import TabKonUpdateContent from './TabKonven/TabKonUpdateContent';
import GiroKonUpdateContent from './GiroKonven/GiroKonUpdateContent';
import DepositoKonUpdateContent from './DepositoKonven/DepositoKonUpdateContent';
import KreditUpdateContent from './Kredit/KreditUpdateContent';
import KreditProduktifUpdateContent from './KreditProduktif/KreditProduktifUpdateContent';
import KreditKonsumerUpdateContent from './KreditKonsumer/KreditKonsumerUpdateContent';
import KreditStandarUpdateContent from './KreditStandar/KreditStandarUpdateContent';
import KreditProgramUpdateContent from './KreditProgram/KreditProgramUpdateContent';
import JasaKonUpdateContent from './JasaKonven/JasaKonUpdateContent';
import KirimanUangKonUpdateContent from './KirimanUangKonven/KirimanUangKonUpdateContent';

import SyariahUpdateContent from './ProdukSyariah/SyariahUpdateContent';
import DanaSyariahUpdateContent from './DanaSyariah/DanaSyariahUpdateContent';
import PembiayaanUpdateContent from './Pembiayaan/PembiayaanUpdateContent';
import ModalKerjaUpdateContent from './ModalKerja/ModalKerjaUpdateContent';
import TabSyariahUpdateContent from './TabSyariah/TabSyariahUpdateContent';
import GiroSyariahUpdateContent from './GiroSyariah/GiroSyariahUpdateContent';
import DepositoSyariahUpdateContent from './DepositoSyariah/DepositoSyariahUpdateContent';

import InvestasiUpdateContent from './Investasi/InvestasiUpdateContent';
import JasaSyariahUpdateContent from './JasaSyariah/JasaSyariahUpdateContent';
import KirimanUangSyariahUpdateContent from './KirimanUangSyariah/KirimanUangSyariahUpdateContent';

import InformasiUpdateContent from './Informasi/InformasiUpdateContent';
import JaringanLayananUpdateContent from './JaringanPelayanan/JaringanLayananUpdateContent';
import LokasiATMUpdateContent from './LokasiATM/LokasiATMUpdateContent';

import InternalUpdateContent from './Internal/InternalUpdateContent';
import StdLayananUpdateContent from './StdLayanan/StdLayananUpdateContent';
import IdentitasPribadiUpdateContent from './IdentitasPribadi/IdentitasPribadiUpdateContent';
import StandarLayananUpdateContent from './StandarLayanan/StandarLayananUpdateContent';
import BdyKerjaUpdateContent from './BdyKerja/BdyKerjaUpdateContent';



function App() {
  const token = localStorage.getItem('access_token');

  if (!token) {
    return <Signin />
  }

  return (
    <div className="wrapper">
      {/* <BrowserRouter>
      <Routes>
        <Route path="/" element={<Signin />} />
          {user_admin === 3  ? (
            <Route path="/">
          <Route path="/home/:id" element={<Home />} />
          <Route path="/produkkonven" element={<ProdukKonven />} />
            </Route>
          ) : (
            <Navigate replace to={"/"} />
          )}
          {user_admin === 1 ? (
            <Route exact path="/users" component={<Stafs />} />
          ) : (
            <Navigate replace to={"/"} /> // (2)**
          )}

      </Routes>
      </BrowserRouter> */}

      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Signin />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/home/:id" element={<Home />} />
          <Route path="/produkkonven" element={<ProdukKonven />} />
          <Route path="/updatekonven/:id" element={<KonvenUpdateContent />} />
          <Route path="/produksyariah" element={<ProdukSyariah />} />
          <Route path="/updatesyariah/:id" element={<SyariahUpdateContent />} />
          <Route path="/informasi" element={<Informasi />} />
          <Route path="/internal" element={<Internal />} />
          <Route path="/helpdesk" element={<Helpdesk />} />
          <Route path="/danakonven" element={<DanaKonven />} />
          <Route path="/updatedanakonven/:id" element={<DanaKonUpdateContent />} />
          <Route path="/tabkonven" element={<TabKonven />} />
          <Route path="/updatetabkonven/:id" element={<TabKonUpdateContent />} />
          <Route path="/addtabkonven" element={<TabKonvenCreate />} />
          <Route path="/tabkonven/detailtabkonven/:id" element={<DetailTabKonven />} />
          <Route path="/girokonven" element={<GiroKonven />} />
          <Route path="/updategirokonven/:id" element={<GiroKonUpdateContent />} />
          <Route path="/girokonven/detailgirokonven/:id" element={<DetailGiroKonven />} />
          <Route path="/depositokonven" element={<DepositoKonven />} />
          <Route path="/updatedepkonven/:id" element={<DepositoKonUpdateContent />} />
          <Route path="/depositokonven/detaildepokonven/:id" element={<DetailDepoKonven />} />
          <Route path="/kredit" element={<Kredit />} />
          <Route path="/updatekredit/:id" element={<KreditUpdateContent />} />
          <Route path="/kredit/detailkredit/:id" element={<DetailKredit />} />
          <Route path="/kreditproduktif" element={<KreditProduktif />} />
          <Route path="/updatekreditproduktif/:id" element={<KreditProduktifUpdateContent />} />
          <Route path="/kreditproduktif/detailkreditproduktif/:id" element={<DetailKreditProduktif />} />
          <Route path="/kreditkonsumer" element={<KreditKonsumer />} />
          <Route path="/updatekreditkonsumer/:id" element={<KreditKonsumerUpdateContent />} />
          <Route path="/kreditkonsumer/detailkreditkonsumer/:id" element={<DetailKreditKonsumer />} />
          <Route path="/kreditstandar" element={<KreditStandar />} />
          <Route path="/updatekreditstandar/:id" element={<KreditStandarUpdateContent />} />
          <Route path="/kreditstandar/detailkreditstandar/:id" element={<DetailKreditStandar />} />
          <Route path="/kreditprogram" element={<KreditProgram />} />
          <Route path="/updatekreditprogram/:id" element={<KreditProgramUpdateContent />} />
          <Route path="/kreditprogram/detailkreditprogram/:id" element={<DetailKreditProgram />} />
          <Route path="/jasakonven" element={<JasaKonven />} />
          <Route path="/updatejasakonven/:id" element={<JasaKonUpdateContent />} />
          <Route path="/jasakonven/detailjasakonven/:id" element={<DetailJasaKonven />} />
          <Route path="/kirimanuang" element={<KirimanUangKonven />} />
          <Route path="/updatekirimuangkonven/:id" element={<KirimanUangKonUpdateContent />} />
          <Route path="/kirimanuang/detailkirimanuang/:id" element={<DetailKirimanUangKonven />} />

          <Route path="/danasyariah" element={<DanaSyariah />} />
          <Route path="/updatedanasyariah/:id" element={<DanaSyariahUpdateContent />} />
          <Route path="/pembiayaan" element={<Pembiayaan />} />
          <Route path="/pembiayaan/detailpembiayaan/:id" element={<DetailPembiayaan />} />
          <Route path="/updatepembiayaan/:id" element={<PembiayaanUpdateContent />} />
          <Route path="/jasasyariah" element={<JasaSyariah />} />
          <Route path="/jasasyariah/detailjasasyariah/:id" element={<DetailJasaSyariah />} />\
          <Route path="/updatejasasyariah/:id" element={<JasaSyariahUpdateContent />} />
          <Route path="/tabsyariah" element={<TabSyariah />} />
          <Route path="/updatetabsyariah/:id" element={<TabSyariahUpdateContent />} />
          <Route path="/tabsyariah/detailtabsyariah/:id" element={<DetailTabSyariah />} />
          <Route path="/girosyariah" element={<GiroSyariah />} />
          <Route path="/updategirosyariah/:id" element={<GiroSyariahUpdateContent />} />
          <Route path="/girosyariah/detailgirosyariah/:id" element={<DetailGiroSyariah />} />
          <Route path="/depositosyariah" element={<DepositoSyariah />} />
          <Route path="/updatedepsyariah/:id" element={<DepositoSyariahUpdateContent />} />
          <Route path="/depositosyariah/detaildeposyariah/:id" element={<DetailDepoSyariah />} />
          <Route path="/modalkerja" element={<ModalKerja />} />
          <Route path="/modalkerja/detailmodalkerja/:id" element={<DetailModalKerja />} />
          <Route path="/updatemodalkerja/:id" element={<ModalKerjaUpdateContent />} />
          <Route path="/investasi" element={<Investasi />} />
          <Route path="/investasi/detailinvestasi/:id" element={<DetailInvestasi />} />
          <Route path="/updateinvestasi/:id" element={<InvestasiUpdateContent />} />
          <Route path="/kirimanuangsyariah" element={<KirimanUangSyariah />} />
          <Route path="/kirimanuangsyariah/detailkirimanuangsyariah/:id" element={<DetailKirimanUangSyariah />} />
          <Route path="/updatekirimuangsyariah/:id" element={<KirimanUangSyariahUpdateContent />} />

          <Route path="/jaringanlayanan" element={<JaringanLayanan />} />
          <Route path="/updateinfo/:id" element={<InformasiUpdateContent />} />
          <Route path="/updatejaringanlayanan/:id" element={<JaringanLayananUpdateContent />} />
          <Route path="/jaringanlayanan/detaillokasilayanan/:id" element={<DetailLokasiLayanan />} />
          <Route path="/updatelokasi/:id" element={<DetailLokasiLayananUpdate />} />
          <Route path="/lokasiatm" element={<LokasiATM />} />
          <Route path="/updatelokasiatm/:id" element={<LokasiATMUpdateContent />} />
          <Route path="/lokasiatm/detaillokasiatm/:id" element={<DetailLokasiATM />} />

          {/* routes  internal*/}
          <Route path="/updateinternal/:id" element={<InternalUpdateContent />} />
          <Route path="/informasi/detailinternal/:id" element={<DetailInternal />} />
          <Route path="/updatenews/:id" element={<DetailInternalUpdate />} />
          <Route path="/detailnews/:id" element={<DetailInternalInfo />} />
          <Route path="/stdlayanan" element={<StdLayanan />} />
          <Route path="/updatestdlayanan/:id" element={<StdLayananUpdateContent />} />
          <Route path="/stdlayanan/detailstdlayanan/:id" element={<DetailStdLayanan />} />
          <Route path="/bdykerja" element={<BdyKerja />} />
          <Route path="/updatebdykerja/:id" element={<BdyKerjaUpdateContent />} />
          <Route path="/bdykerja/detailbdykerja/:id" element={<DetailBdyKerja />} />
          <Route path="/identitaspribadi" element={<IdentitasPribadi />} />
          <Route path="/updateidentitas/:id" element={<IdentitasPribadiUpdateContent />} />
          <Route path="/identitaspribadi/detailidentitas/:id" element={<DetailIdentitasPribadi />} />
          <Route path="/standarlayanan" element={<StandarLayanan />} />
          <Route path="/updatestandarlayanan/:id" element={<StandarLayananUpdateContent />} />
          <Route path="/standarlayanan/detailstandarlayanan/:id" element={<DetailStandarLayanan />} />


          <Route path="/strukturmenu" element={<StrukturMenu />} />

          <Route path="/users" element={<Stafs />} />
          <Route path="/updatestaf/:id" element={<UserUpdate />} />

          {/* routes data divisi */}
          <Route path="/divisi" element={<Level />} />
          <Route path="/divisi/:id" element={<Level />} />
          <Route path="/updatedivisi/:id" element={<DivisiUpdate />} />
          <Route path="/divisi/privilege/:id" element={<PrivilegeDataDivisi />} />

        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;