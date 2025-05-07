export const emailRegex =
  // eslint-disable-next-line no-useless-escape
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{1,}))$/

export enum API_VERSION {
  V1 = 'api/v1',
  V2 = 'api/v2'
}

export enum THEME {
  LIGHT = 'light',
  DARK = 'dark'
}

export enum ACTION {
  CREATE_NEW_POST = 'CREATE_NEW_POST',
  SHOW_DEFAULT_PAGE = 'SHOW_DEFAULT_PAGE'
}

export enum CREATE_POST_WITH_OPTION {
  TEXT = 'TEXT',
  IMAGE_VIDEO = 'IMAGE_VIDEO',
  LINK = 'LINK'
}
