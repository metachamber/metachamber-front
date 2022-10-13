interface Datasource {
  name: string;
  description: string;
}

interface Owner {
  id: number;
  name: string;
  description: string;
}

export interface Field {
  id: number;
  name: string;
  description: string;
  editable?: boolean;
}

export interface Dataset {
  id: number;
  name: string;
  description: string;
  owner: Owner;
  datasource: Datasource;
  fields: Array<Field>;
}
