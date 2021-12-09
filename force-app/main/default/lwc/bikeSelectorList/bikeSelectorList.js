import { LightningElement } from 'lwc';
import { bikes } from 'c/bikeSelectorData';

export default class bikeSelectorList extends LightningElement {
    bikes = bikes;

    handleTileClick(evt) {
        // This component wants to emit a productselected event to its parent
        const event = new CustomEvent('productselected', {
            detail: evt.detail
        });
        // Fire the event from c-list
        this.dispatchEvent(event);
    }
}
