const removeProtocol = (link: string) => link.replace(/(^\w+:|^)\/\//, '')

export default removeProtocol