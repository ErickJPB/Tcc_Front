import { PoLanguageService } from '../../../services/po-language/po-language.service';
import * as i0 from "@angular/core";
/**
 * @docsPrivate
 *
 * Componente de uso interno, responsável por atribuir uma label para o campo
 */
export declare class PoFieldContainerComponent {
    /** Label do campo. */
    label?: string;
    /** Texto de apoio do campo. */
    help: string;
    literals: any;
    private _optional;
    /** Indica se o campo será opcional. */
    set optional(value: boolean);
    get optional(): boolean;
    constructor(languageService: PoLanguageService);
    static ɵfac: i0.ɵɵFactoryDeclaration<PoFieldContainerComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<PoFieldContainerComponent, "po-field-container", never, { "label": "p-label"; "help": "p-help"; "optional": "p-optional"; }, {}, never, ["*"], false>;
}
