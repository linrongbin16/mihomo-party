type OutboundMode = 'rule' | 'global' | 'direct'
type LogLevel = 'info' | 'debug' | 'warning' | 'error' | 'silent'
type SysProxyMode = 'auto' | 'manual'
type AppTheme =
  | 'system'
  | 'light'
  | 'dark'
  | 'gray'
  | 'light-pink'
  | 'dark-pink'
  | 'gray-pink'
  | 'light-green'
  | 'dark-green'
  | 'gray-green'
type MihomoGroupType = 'Selector' | 'URLTest' | 'LoadBalance' | 'Relay'
type MihomoProxyType =
  | 'Direct'
  | 'Reject'
  | 'RejectDrop'
  | 'Pass'
  | 'Dns'
  | 'Compatible'
  | 'Socks5'
  | 'Http'
  | 'Ssh'
  | 'Shadowsocks'
  | 'ShadowsocksR'
  | 'Snell'
  | 'Vmess'
  | 'Vless'
  | 'Trojan'
  | 'Hysteria'
  | 'Hysteria2'
  | 'Tuic'
  | 'WireGuard'
type TunStack = 'gvisor' | 'mixed' | 'system'
type FindProcessMode = 'off' | 'strict' | 'always'
type DnsMode = 'normal' | 'fake-ip' | 'redir-host'

interface IMihomoVersion {
  version: string
  meta: boolean
}

interface IMihomoTrafficInfo {
  up: number
  down: number
}

interface IMihomoMemoryInfo {
  inuse: number
  oslimit: number
}

interface IMihomoLogInfo {
  type: LogLevel
  payload: string
  time?: string
}

interface IMihomoRulesInfo {
  rules: IMihomoRulesDetail[]
}

interface IMihomoRulesDetail {
  type: string
  payload: string
  proxy: string
  size: number
}

interface IMihomoConnectionsInfo {
  downloadTotal: number
  uploadTotal: number
  connections?: IMihomoConnectionDetail[]
  memory: number
}

interface IMihomoConnectionDetail {
  id: string
  metadata: {
    network: 'tcp' | 'udp'
    type: string
    sourceIP: string
    destinationIP: string
    destinationGeoIP: string
    destinationIPASN: string
    sourcePort: string
    destinationPort: string
    inboundIP: string
    inboundPort: string
    inboundName: string
    inboundUser: string
    host: string
    dnsMode: string
    uid: number
    process: string
    processPath: string
    specialProxy: string
    specialRules: string
    remoteDestination: string
    dscp: number
    sniffHost: string
  }
  uploadSpeed?: number
  downloadSpeed?: number
  upload: number
  download: number
  start: string
  chains: string[]
  rule: string
  rulePayload: string
}

interface IMihomoHistory {
  time: string
  delay: number
}

type IMihomoGroupDelay = Record<string, number>

interface IMihomoDelay {
  delay?: number
  message?: string
}

interface IMihomoProxy {
  alive: boolean
  extra: Record<string, { alive: boolean; history: IMihomoHistory[] }>
  history: IMihomoHistory[]
  id: string
  name: string
  tfo: boolean
  type: MihomoProxyType
  udp: boolean
  xudp: boolean
}

interface IMihomoGroup {
  alive: boolean
  all: string[]
  extra: Record<string, { alive: boolean; history: IMihomoHistory[] }>
  testUrl?: string
  hidden: boolean
  history: IMihomoHistory[]
  icon: string
  name: string
  now: string
  tfo: boolean
  type: MihomoGroupType
  udp: boolean
  xudp: boolean
}

interface IMihomoProxies {
  proxies: Record<string, IMihomoProxy | IMihomoGroup>
}

interface IMihomoRuleProviders {
  providers: Record<string, IMihomoRuleProvider>
}

interface IMihomoRuleProvider {
  behavior: string
  format: string
  name: string
  ruleCount: number
  type: string
  updatedAt: string
  vehicleType: string
}

interface IMihomoProxyProviders {
  providers: Record<string, IMihomoProxyProvider>
}

interface ISubscriptionUserInfoUpper {
  Upload: number
  Download: number
  Total: number
  Expire: number
}

interface IMihomoProxyProvider {
  name: string
  type: string
  proxies?: IMihomoProxy[]
  subscriptionInfo?: ISubscriptionUserInfoUpper
  expectedStatus: string
  testUrl?: string
  updatedAt?: string
  vehicleType: string
}

interface ISysProxyConfig {
  enable: boolean
  host?: string
  mode?: SysProxyMode
  bypass?: string[]
  pacScript?: string
}

interface IAppConfig {
  core: 'mihomo' | 'mihomo-alpha'
  proxyDisplayMode: 'simple' | 'full'
  proxyDisplayOrder: 'default' | 'delay' | 'name'
  siderOrder: string[]
  appTheme: AppTheme
  autoCheckUpdate: boolean
  silentStart: boolean
  autoCloseConnection: boolean
  sysProxy: ISysProxyConfig
  userAgent?: string
  delayTestUrl?: string
  delayTestTimeout?: number
  encryptedPassword?: Buffer
  controlDns?: boolean
  controlSniff?: boolean
  useNameserverPolicy: boolean
  nameserverPolicy: { [key: string]: string | string[] }
}

interface IMihomoTunConfig {
  enable?: boolean
  stack?: TunStack
  'auto-route'?: boolean
  'auto-redirect'?: boolean
  'auto-detect-interface'?: boolean
  'dns-hijack'?: string[]
  device?: string
  mtu?: number
  'strict-route'?: boolean
  gso?: boolean
  'gso-max-size'?: number
  'udp-timeout'?: number
  'iproute2-table-index'?: number
  'iproute2-rule-index'?: number
  'endpoint-independent-nat'?: boolean
  'route-address-set'?: string[]
  'route-exclude-address-set'?: string[]
  'route-address'?: string[]
  'route-exclude-address'?: string[]
  'include-interface'?: string[]
  'exclude-interface'?: string[]
  'include-uid'?: number[]
  'include-uid-range'?: string[]
  'exclude-uid'?: number[]
  'exclude-uid-range'?: string[]
  'include-android-user'?: string[]
  'include-package'?: string[]
  'exclude-package'?: string[]
}
interface IMihomoDNSConfig {
  enable?: boolean
  ipv6?: boolean
  'enhanced-mode'?: DnsMode
  'fake-ip-range'?: string
  'fake-ip-filter'?: string[]
  'use-hosts'?: boolean
  'use-system-hosts'?: boolean
  'respect-rules'?: boolean
  nameserver?: string[]
  fallback?: string[]
  'fallback-filter'?: { [key: string]: boolean | string | string[] }
  'proxy-server-nameserver'?: string[]
  'nameserver-policy'?: { [key: string]: string | string[] }
}

interface IMihomoSnifferConfig {
  enable?: boolean
  'parse-pure-ip'?: boolean
  'override-destination'?: boolean
  'force-dns-mapping'?: boolean
  'force-domain'?: string[]
  'skip-domain'?: string[]
  sniff?: {
    HTTP?: {
      ports: (number | string)[]
      'override-destination'?: boolean
    }
    TLS?: {
      ports: (number | string)[]
    }
    QUIC?: {
      ports: (number | string)[]
    }
  }
}
interface IMihomoConfig {
  'external-controller': string
  secret?: string
  ipv6: boolean
  mode: OutboundMode
  'mixed-port': number
  'allow-lan': boolean
  'unified-delay': boolean
  'log-level': LogLevel
  'find-process-mode': FindProcessMode
  'socks-port'?: number
  'redir-port'?: number
  'tproxy-port'?: number
  port?: number
  proxies?: []
  'proxy-groups'?: []
  rules?: []
  hosts?: { [key: string]: string | string[] }
  'geodata-mode'?: boolean
  'geo-auto-update'?: boolean
  'geo-update-interval'?: number
  'geox-url'?: {
    geoip?: string
    geosite?: string
    mmdb?: string
    asn?: string
  }
  tun: IMihomoTunConfig
  dns: IMihomoDNSConfig
  sniffer: IMihomoSnifferConfig
}

interface IProfileConfig {
  current?: string
  items: IProfileItem[]
}

interface IOverrideItem {
  id: string
  type: 'remote' | 'local'
  name: string
  updated: number
  url?: string
  file?: string
}

interface IOverrideConfig {
  items: IOverrideItem[]
}

interface ISubscriptionUserInfo {
  upload: number
  download: number
  total: number
  expire: number
}

interface IProfileItem {
  id: string
  type: 'remote' | 'local'
  name: string
  url?: string // remote
  file?: string // local
  interval?: number
  home?: string
  updated?: number
  override?: string[]
  extra?: ISubscriptionUserInfo
}
