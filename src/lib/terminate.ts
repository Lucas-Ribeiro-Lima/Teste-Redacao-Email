import type { Http2Server } from "http2"

type OptionsType = {
  coreDump: boolean
  timeout: number
}

export function terminate(server: Http2Server, { coreDump = false, timeout = 1500 }: OptionsType ) {

  const exit = (code: number) => coreDump ? process.abort() : process.exit(code)

  return (code: number): void => {
    console.log(`\x1b[33m-----------------------------------------\x1b[0m\n`)
    console.error(`\x1b[41mEncerrando o servidor\x1b[0m`)
    server.close(exit(code))
    setTimeout(exit(code), timeout)
  }
}