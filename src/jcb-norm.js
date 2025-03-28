import { LitElement, css, html } from 'lit'

export class Norm extends LitElement {

   static get properties() {
      return {
         domain: {type: Object},
         norm: { type: Object },
         value: { type: Number },
         colorNormInf: { type: String },
         colorNormal: { type: String },
         colorNormSup: { type: String },
      }
   }

   constructor() {
      super()
      // default values - before override by attributes
      this.domain = { inf: 0., sup: 100. }
      this.norm = { inf: 40., sup: 60. }
      this.value = 50.
      this.colorNormInf = '#51AEE9'
      this.colorNormal = '#9FCE65'
      this.colorNormSup = '#F6C242'
   }
   
   // Percentage value for norm.inf
   // domain.inf -> 0%, domain.sup -> 100%
   get normInfPercentage() {
      return ((this.norm.inf - this.domain.inf) / (this.domain.sup - this.domain.inf) * 100.).toPrecision(3)
   }
   
   // Percentage value for norm.sup
   // domain.inf -> 0%, domain.sup -> 100%
   get normSupPercentage() {
      return ((this.norm.sup - this.domain.inf) / (this.domain.sup - this.domain.inf) * 100.).toPrecision(3)
   }

   render() {
      console.log('domain', this.domain)
      console.log('norm', this.norm)
      return html`
         <div style="height: 50%; position: relative; top: 25%; background: linear-gradient(to right, ${this.colorNormInf} 0%, ${this.colorNormal} ${this.normInfPercentage}%, ${this.colorNormal} ${this.normSupPercentage}%, ${this.colorNormSup} 100%);">
            <span style="position: relative; top: -50%; left: ${this.normInfPercentage}%; color: ${this.colorNormInf};">${this.normInfPercentage}</span>
            <span style="position: relative; top: -50%; left: ${this.normSupPercentage}%; color: ${this.colorNormSup};">${this.normSupPercentage}</span>
         </div>
      `
   }

   static get styles() {
      return css`
         /* :host selects the host element (<jcb-norm>, not its shadow dom) */
         :host {
            display: inline-block; /* by default a CE is inline and width & height do not apply */
            width: 100%; /* <jcb-norm> takes full parent width */
            height: 100%; /* <jcb-norm> takes full parent height */
            font-family: var(--jcb-norm-font-family, Arial);
            font-size: var(--jcb-norm-font-size, 14px);
         }
      `
   }
}

window.customElements.define('jcb-norm', Norm)
