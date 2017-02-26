export interface DataFixture {
    id: string;
}

export interface DataFixtures<T extends DataFixture> {

    data: T[];
}
