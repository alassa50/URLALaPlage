const fs = require('fs');
const { v4: uuidv4 } = require('uuid');

class memdb {
  db = [];

  constructor(path) {
    // pas de path, seulement en mémoire
    if (path === undefined) this.db = [];
    // si le path existe alors ok lecture sinon mémoire
    else if (fs.existsSync(path)) {
      this.db = JSON.parse(fs.readFileSync(path).toString());
    } else this.db = [];
  }

  // eslint-disable-next-line class-methods-use-this
  #isJSONObject(obj) {
    return obj !== undefined && obj !== null && obj.constructor === Object;
  }

  insert(obj) {
    if (!this.#isJSONObject(obj)) throw new Error('Not an object');
    const lobj = obj;
    // on recupère un UUID
    lobj.memDBID = uuidv4();
    // on ajoute l'objet
    this.db.push(lobj);
    // On retourne l'UUID
    return lobj.memDBID;
  }

  #inSelect(obj) {
    let a = this.db.filter((x) => x[Object.keys(obj)[0]] === obj[Object.keys(obj)[0]]);
    for (let i = 1; i < Object.keys(obj).length; i += 1) {
      a = a.filter((x) => x[Object.keys(obj)[i]] === obj[Object.keys(obj)[i]]);
    }
    return a;
  }

  select(obj) {
    if (obj === undefined) return this.db;
    if (Object.keys(obj).indexOf('where') === -1 || !this.#isJSONObject(obj)) {
      throw new Error('Query error');
    }
    return this.#inSelect(obj.where);
  }

  update(obj) {
    if (
      Object.keys(obj).indexOf('where') === -1 ||
      Object.keys(obj).indexOf('set') === -1 ||
      !this.#isJSONObject(obj)
    ) {
      throw new Error('Query error');
    }
    const a = this.#inSelect(obj.where);
    const { set } = obj;
    a.forEach((_a) => {
      Object.keys(set).forEach((_set) => {
        // eslint-disable-next-line no-underscore-dangle, no-param-reassign
        _a[_set] = set[_set];
      });
    });
    return a;
  }

  delete(obj) {
    if (Object.keys(obj).indexOf('where') === -1 || !this.#isJSONObject(obj)) {
      throw new Error('Query error');
    }
    // eslint-disable-next-line max-len
    this.db = this.db.filter(
      (x) => x[Object.keys(obj.where)[0]] !== obj.where[Object.keys(obj.where)[0]],
    );
  }

  truncate() {
    this.db = [];
  }

  save(path) {
    if (path === null || path === undefined) throw new Error('Path is missing');
    const a = fs.createWriteStream(path);
    a.write(JSON.stringify(this.db, null, 2));
    a.end();
  }
}

module.exports = memdb;
