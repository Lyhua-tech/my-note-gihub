class footerCompo extends HTMLElement{
    connectedCallback(){
        this.innerHTML = `
        <footer>
            <section class="center-footer">
                <h3>Authorized by Sreang Lyhour</h3>
            </section>
        </footer>
        `
    }
}
customElements.define('my-footer', footerCompo)