import { LovelaceCard, LovelaceCardEditor } from 'custom-card-helpers';

declare global {
  interface HTMLElementTagNameMap {
    'tesla-style-solar-power-card-editor': LovelaceCardEditor;
    'hui-error-card': LovelaceCard;
  }
}
