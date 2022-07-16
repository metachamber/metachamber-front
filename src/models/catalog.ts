interface Datasource {
  name: string;
  description: string;
}

interface Owner {
  name: string;
  description: string;
}

interface Field {
  name: string;
  description: string;
}

export interface Dataset {
  id: number;
  name: string;
  description: string;
  owner: Owner;
  datasource: Datasource;
  fields: Array<Field>;
}
