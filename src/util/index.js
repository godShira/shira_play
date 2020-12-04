const SLICER = 2
export const getFileList = ctx => ctx.keys().map(file => file.slice(SLICER, file.lastIndexOf('/')))
