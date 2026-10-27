import type {ISample} from "./interfaces/sample.interface.ts";
import {mockConfigurations} from "../mocks/configurations.ts";

function getConfigurations(): ISample[] {
    return mockConfigurations
}


export default getConfigurations
