
export function terminate(server, options: { coreDump: false, timeout: 1500 }) {

  const exit = (code: number) => options.coreDump ? process.abort() : process.exit(code)

  return (code: number): void => {
    console.log(`\x1b[33m-----------------------------------------\x1b[0m\n`)
    console.error(`\x1b[41mEncerrando o servidor\x1b[0m`)
    server.close(exit(code))
    setTimeout(exit(code), options.timeout)
  }
}