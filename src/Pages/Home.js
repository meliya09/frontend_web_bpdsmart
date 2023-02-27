import React from 'react'
import Menu from '../Dashboard/Menu'
import Header from '../Dashboard/Header'
import Footer from '../Dashboard/Footer'

const Home = () => {
    return (
        <div>
            <Header />
            <Menu />
            <div className="col-md-12">
                <div className="card text-white">
                    <div className="card-header bg-info">BANK BPD DIY</div>
                    <div className="card-body text-dark">
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default Home