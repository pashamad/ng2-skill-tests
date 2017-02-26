import {DataFixtures, DataFixture} from "../../datastore/fixtures/data-fixtures";

export interface AdminFixture extends DataFixture {
    name: string;
}

export const AdminFixtures: DataFixtures<AdminFixture> = {

    data: [
        {id: "1", name: 'Admin 1'},
        {id: "2", name: 'Admin 2'}
    ]
};
