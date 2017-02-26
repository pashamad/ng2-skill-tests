import {DataFixtures, DataFixture} from "../../datastore/fixtures/data-fixtures";

export interface ClientDetailFixture extends DataFixture {
    client_id: string;
    age: number;
}

export const ClientDetailFixtures: DataFixtures<ClientDetailFixture> = {

    data: [
        {id: "1", client_id: "1", age: 16},
        {id: "2", client_id: "2", age: 1024}
    ]
};
