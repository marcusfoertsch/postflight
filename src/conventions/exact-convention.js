const exactStrategy = (propertyName, dbColumnName) => {
  if (propertyName === dbColumnName) {
    return true;
  }

  return false;
};

export default exactStrategy;
