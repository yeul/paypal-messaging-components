import ni from './ni';
import niQual from './ni_qual';
import niNonUs from './ni_non-us';
import ezpAnyEqz from './ezp_any_eqz';
import ezpAnyGtz from './ezp_any_gtz';
import palaMultiEqz from './pala_multi_eqz';
import palaMultiGtz from './pala_multi_gtz';
import palaSingleEqz from './pala_single_eqz';
import palaSingleGtz from './pala_single_gtz';

export default function getMutations(id, type) {
    switch (id) {
        case 'EZP:ANY:EQZ':
            return ezpAnyEqz[type];
        case 'EZP:ANY:GTZ':
            return ezpAnyGtz[type];
        case 'PALA:MULTI:EQZ':
            return palaMultiEqz[type];
        case 'PALA:MULTI:GTZ':
            return palaMultiGtz[type];
        case 'PALA:SINGLE:EQZ':
            return palaSingleEqz[type];
        case 'PALA:SINGLE:GTZ':
            return palaSingleGtz[type];
        case 'NI:NON-US':
            return niNonUs[type];
        case 'NI:QUALIFYING-true':
            return niQual[type];
        case 'NI:QUALIFYING-false':
        default:
            return ni[type];
    }
}
