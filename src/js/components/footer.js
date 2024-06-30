class footerCompo extends HTMLElement{
    connectedCallback(){
        this.innerHTML = `
        <footer>
            <section class="center-footer">
                <h3>Publish by Sreang Lyhour</h3>
            </section>
        </footer>
        `
    }
}
customElements.define('my-footer', footerCompo)