'use client';

import { createElement } from 'react';
import type { ComponentType } from 'react';
import type { IconType } from 'react-icons';

import * as Si from 'react-icons/si';
import * as Fa from 'react-icons/fa';
import * as Tb from 'react-icons/tb';

const LIBRARIES: Record<string, Record<string, IconType>> = {
  si: Si,
  fa: Fa,
  tb: Tb,
};

const PREFIX_LIB_MAP: [string, string][] = [
  ['Si', 'si'],
  ['Fa', 'fa'],
  ['Tb', 'tb'],
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
