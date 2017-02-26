import {DataFixtures, DataFixture} from "../../datastore/fixtures/data-fixtures";

export interface ClientFixture extends DataFixture {
    name: string;
}

export const ClientFixtures: DataFixtures<ClientFixture> = {

    data: [
        {id: "1", name: 'Client 1'},
        {id: "2", name: 'Client 2'}
    ]
};
