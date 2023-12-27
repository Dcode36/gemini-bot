import React from 'react';
import img from './digvi.png'
function Navbar() {

    return (
        <nav className="d-flex justify-content-between align-items-center p-5 sticky-top">
            <div className="fs-2 fw-bold">Gem<span>Bot.</span>AI</div>
            <ul className='d-flex  align-items-center  p-2 fs-5 my-2'>
                <li><a href="https://digvijaykadam.com" target='_blank'><img src={img} alt="" /></a></li>
                <li><a className=' mx-2 text-decoration-none text-dark' href="https://github.com/Dcode36/gemini-bot"><i class="bi bi-github"></i></a></li>

            </ul>
        </nav>


    );
}

export default Navbar
