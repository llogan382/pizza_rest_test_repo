import { ModelInit, MutableModel, PersistentModelConstructor } from "@aws-amplify/datastore";





type CustomerMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

export declare class Customer {
  readonly id: string;
  readonly firstName?: string;
  readonly lastName?: string;
  readonly phone?: number;
  readonly address?: string;
  readonly city?: string;
  readonly state?: string;
  readonly zip?: number;
  readonly createdAt?: string;
  readonly updatedAt?: string;
  constructor(init: ModelInit<Customer, CustomerMetaData>);
  static copyOf(source: Customer, mutator: (draft: MutableModel<Customer, CustomerMetaData>) => MutableModel<Customer, CustomerMetaData> | void): Customer;
}