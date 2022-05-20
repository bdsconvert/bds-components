export class BDSList extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" });
        this.bdslisthdr = this.getAttribute("list-hdr");
        this.bdslist = JSON.parse(this.getAttribute("list-items"));
        console.log(this.bdslist);
    }

    connectedCallback() {
        let list = "";
        this.bdslist.forEach(item => {
            list += `
                <details>
                    <summary>${item.filename}</summary>
                    <p>
                        File Type: ${item.filetype}<br/>
                        File Size: ${item.filesize}<br/>
                        Loaded: ${item.loaded}
                    </p>
                </details>
            `;

        })
        this.shadowRoot.innerHTML = `
            <style>
                *, ::before, ::after {
                    box-sizing: border-box;
                }                
                html {
                    background-color: #cfd8dc;
                }  
                h2 {
                    margin: 0;
                    text-align: center;
                }
                section {
                    padding-top:1rem;             
                    width:90vw;
                }              
                details {   
                    padding:0 1rem 0 1rem;             
                    border-bottom: 1px solid #78909c;
                    position: relative;
                    /*color: #263238;*/
                    transition: background-color 0.25s;
                }
                    details > :last-child {
                    margin-bottom: 1rem;
                }                
                details::before {
                    width: 100%;
                    height: 100%;
                    content: "";
                    position: absolute;
                    top: 0;
                    left: 0;
                    opacity: 0.15;
                    pointer-events: none;
                    transition: opacity 0.2s;
                    z-index: -1;
                }
                details[open] {
                    background-color: #fff;
                }
                details[open]::before {
                    opacity: 0.6;
                }            
                summary {
                    padding: 1rem 2rem;
                    display: block;
                    position: relative;
                    font-size: 1.25rem;
                    font-weight: bold;
                    cursor: pointer;
                }            
                summary::before, summary::after {
                    width: 0.75rem;
                    height: 2px;
                    position: absolute;
                    top: 50%;
                    left: 0;
                    content: "";
                    background-color: currentColor;
                    text-align: right;
                    transform: translateY(-50%);
                    transition: transform 0.2s ease-in-out;
                }           
                summary::after {
                    transform: translateY(-50%) rotate(90deg);
                }            
                [open] summary::after {
                    transform: translateY(-50%) rotate(180deg);
                }          
                summary::-webkit-details-marker {
                    display: none;
                }
                details > :not(summary) {
                    padding: 1rem;
                    margin:0;
                    background-color: #fff;
                    transform: scaleY(0);
                    transform-origin: top;
                    transition: transform 300ms;
                    border-top: 0.1px solid lightgray;
                    /*box-shadow: 0 0.25em 0.5em #263238;*/
                }
                details[open] > :not(summary) {
                    transform: scaleY(1);
                }
            </style>
            <section>
                <h2>${this.bdslisthdr}</h2>
                ${list}
            </section>
        `;
        //content:"🡒 "; 
        //content:"🡑 ";
    }
}
window.customElements.define("bds-list", BDSList);