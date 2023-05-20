export type Article = {
  _path: string,
  _dir: string,
  _draft: boolean,
  _partial: boolean,
  _locale: string,
  _empty: boolean,
  _type: string,
  _id: string,
  _source: string,
  _file: string,
  _extension: string,

  title: string,
  description: string,
  excerpt: object,
  tags: string[],
  uid?: number,
  date: string,
  body: object,
}
