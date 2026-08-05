'use client';

import { createElement } from 'react';
import type { ComponentType } from 'react';
import type { IconType } from 'react-icons';

import * as Si from 'react-icons/si';
import * as Fa from 'react-icons/fa';
import * as Fi from 'react-icons/fi';
import * as Tb from 'react-icons/tb';
import * as Md from 'react-icons/md';
import * as Bi from 'react-icons/bi';
import * as Hi2 from 'react-icons/hi2';
import * as Gi from 'react-icons/gi';
import * as Bs from 'react-icons/bs';
import * as Io5 from 'react-icons/io5';
import * as Vsc from 'react-icons/vsc';
import * as Go from 'react-icons/go';
import * as Ai from 'react-icons/ai';
import * as Lu from 'react-icons/lu';
import * as Pi from 'react-icons/pi';
import * as Sl from 'react-icons/sl';
import * as Rx from 'react-icons/rx';
import * as Ri from 'react-icons/ri';
import * as Cg from 'react-icons/cg';
import * as Di from 'react-icons/di';
import * as Wi from 'react-icons/wi';
import * as Im from 'react-icons/im';
import * as Ci from 'react-icons/ci';

const LIBRARIES: Record<string, Record<string, IconType>> = {
  si: Si,
  fa: Fa,
  fi: Fi,
  tb: Tb,
  md: Md,
  bi: Bi,
  hi2: Hi2,
  gi: Gi,
  bs: Bs,
  io5: Io5,
  vsc: Vsc,
  go: Go,
  ai: Ai,
  lu: Lu,
  pi: Pi,
  sl: Sl,
  rx: Rx,
  ri: Ri,
  cg: Cg,
  di: Di,
  wi: Wi,
  im: Im,
  ci: Ci,
};

const PREFIX_LIB_MAP: [string, string][] = [
  ['Si', 'si'],
  ['Fa', 'fa'],
  ['Fi', 'fi'],
  ['Tb', 'tb'],
  ['Md', 'md'],
  ['Bi', 'bi'],
  ['Hi', 'hi2'],
  ['Gi', 'gi'],
  ['Bs', 'bs'],
  ['Io', 'io5'],
  ['Vsc', 'vsc'],
  ['Go', 'go'],
  ['Ai', 'ai'],
  ['Lu', 'lu'],
  ['Pi', 'pi'],
  ['Sl', 'sl'],
  ['Rx', 'rx'],
  ['Ri', 'ri'],
  ['Cg', 'cg'],
  ['Di', 'di'],
  ['Wi', 'wi'],
  ['Im', 'im'],
  ['Ci', 'ci'],
];

function resolveLibrary(iconName: string): string {
  for (const [prefix, lib] of PREFIX_LIB_MAP) {
    if (iconName.startsWith(prefix)) return lib;
  }
  return 'si';
}

type IconProps = { className?: string; size?: number; title?: string };

export function DynamicIcon({ name, ...props }: { name: string } & IconProps) {
  const lib = resolveLibrary(name);
  const icons = LIBRARIES[lib];
  const Resolved = icons?.[name] as ComponentType<IconProps> | undefined;

  if (Resolved) {
    return <Resolved {...props} />;
  }

  return createElement('span', { className: props.className, title: name }, name);
}
