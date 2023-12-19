import React from 'react';
import img from './digvi.png'
function Navbar() {

    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary p-4 d-flex justify-content-center">
            <div className="container-fluid d-flex justify-content-between ">
                <a className="navbar-brand fs-2 col-lg-7 col-md-7 col-sm-4 col-xs-4 mx-lg-5 mx-md-0 mx-sm-0 mx-xs-0" href="/">Dcode</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon" />
                </button>
                <div className="collapse navbar-collapse " id="navbarText">
                    <ul className="navbar-nav  mb-2 mb-lg-0 d-flex justify-content-end">
                        <li className="nav-item">
                            <a className="nav-link active" aria-current="page" href="/">Home</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/">Docs</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/">Github</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/">Developer</a>
                        </li>
                    </ul>
                    <span class="navbar-text collapse navbar-collapse">
                        <img src={img} alt="logo" className='digvi' />
                    </span>
                </div>

            </div>
        </nav>


    );
}

export default Navbar
