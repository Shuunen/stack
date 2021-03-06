import { execSync } from 'child_process'
import { logger } from './logger'
import { stackFolder } from './utils'

export function info (pkg: packageJson): void {
  logger.log(`  ......................................................................
  .   o   \\ o /  _ o        __|    \\ /     |__         o _  \\ o /   o
  .  /|\\    |     /\\   __\\o   \\o    |    o/     o/__   /\\     |    /|\\
  .  / \\   / \\   | \\  /) |    ( \\  /o\\  / )    |   (\\  / |   / \\   / \\
  .       ..............................................................
  . \\ o / .
  .   |   .      .M"""bgd  mm                  '7MM
  .  / \\  .     ,MI    "Y  MM                    MM
  .       .      'MMb.   mmMMmm  ,6"Yb.  ,p6"bo  MM  ,MP'
  .  _ o  .        'YMMNq. MM   8)   MM 6M'  OO  MM ;Y
  .   /\\  .      .     'MM MM    ,pm9MM 8M       MM;Mm
  .  | \\  .      Mb     dM MM   8M   MM YM.    , MM 'Mb.
  .       .      P"Ybmmd"  'Mbmo'Moo9^Yo.YMbmd'.JMML. YA.
  .       .
  .  __\\o .      - location     : ${stackFolder}
  . /) |  .      - working dir  : ${process.cwd()}
  .       .      - last commit  : ${execSync('git rev-parse --short HEAD').toString().trim()}
  . __|   .      - package name : ${pkg.name}
  .   \\o  .      - version      : ${pkg.version}
  .   ( \\ . `)
}
