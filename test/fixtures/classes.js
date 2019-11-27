export const ModelSpec = class {
  constructor(propertyMap, modelClass) {
      this._propertyMap = propertyMap;
      this._modelClass = modelClass;
  }
};

export const Person = class {
  constructor(
      id = null,
      firstName = null,
      lastName = null,
      birthday = null
  ) {
      this.id = id;
      this.firstName = firstName;
      this.lastName = lastName;
      this.birthday = birthday;
  }
};

export const Widget = class {
  constructor(id, name, weight, packageSize) {
      this.id = id;
      this.name = name;
      this.weight = weight;
      this.packageSize = packageSize;
  }
};