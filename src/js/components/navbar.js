class NavbarCom extends HTMLElement{
    connectedCallback(){
        this.innerHTML = `
            <header class="header-contain">
                <nav class="nav-container">
                    
                    <div class="logo-box">
                        <img src="/src/images/my-note-logo.svg" alt="">
                    </div>

                    <h2>Dairy Web Application</h2>
                    <div class='user-img'>
                        <img src="/src/images/pfp-web.jpeg"
                    </div>
                </nav>
            </header>
        `
    }
}

customElements.define('my-navbar', NavbarCom)