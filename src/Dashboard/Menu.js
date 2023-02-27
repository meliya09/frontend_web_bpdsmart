import React from 'react'

const Menu = () => {
  return (
    <div>
      <aside className="main-sidebar sidebar-light-info">
        {/* Brand Logo */}
        <a href="index" className="brand-link">
      <img src="dist/img/logobpd.png" alt="BPD Logo" className="brand-image img-circle elevation-2" style={{opacity: '.8'}} />
          <span className="brand-text font-weight-light "> BPD DIY SMART </span>
        </a>
        <div className="sidebar">
          <nav className="mt-2">
            <ul className="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
              <li className="header" />
              <li className="nav-item">
              <a href="<?= site_url('C_Produk_Konven') ?>" className="nav-link">
                  <i className="nav-icon fas fa-home" />
                  <p>
                    Home
                  </p>
                  </a>
              </li>
              <li className="nav-item menu">
                <a href="<?= site_url('C_Produk_Konven') ?>" className="nav-link">
                  <i className="nav-icon fas fa-desktop" />
                  <p>
                    Produk Konvensional
                  </p>
                </a>
              </li>
              <li className="nav-item menu">
                <a href="#" className="nav-link">
                  <i className="nav-icon fas fa-desktop" />
                  <p>
                    Produk Syariah
                  </p>
                </a>
              </li><li>
              </li><li className="nav-item menu">
                <a href="C_Informasi" className="nav-link">
                  <i className="nav-icon fas fa-info-circle" />
                  <p>
                    Informasi
                  </p>
                </a>
              </li>
              <li className="nav-item menu">
                <a href="<?= site_url('admin/internal') ?>" className="nav-link">
                  <i className="nav-icon fas fa-info-circle" />
                  <p>
                    Internal
                  </p>
                </a>
              </li>
              <li className="nav-item menu">
                <a href="#" className="nav-link">
                  <i className="nav-icon fas fa-users" />
                  <p>
                    Help
                  </p>
                </a>
              </li>
              {/* <li className="nav-item menu">
                <a href="<?= site_url('C_Superadmin/struktur_menu') ?>" className="nav-link">
                  <i className="nav-icon fas fa-desktop" />
                  <p>
                    Struktur Menu
                  </p>
                </a>
              </li>
              <li className="nav-item menu">
                <a href="v_data_user" className="nav-link">
                  <i className="nav-icon fas fa-desktop" />
                  <p>
                    Data User
                  </p>
                </a>
              </li>
              <li className="nav-item menu">
                <a href="v_data_divisi" className="nav-link">
                  <i className="nav-icon fas fa-desktop" />
                  <p>
                    Data Divisi
                  </p>
                </a>
              </li> */}
            </ul>
          </nav>
        </div></aside>

    </div>
  )
}

export default Menu