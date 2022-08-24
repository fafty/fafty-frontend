import type { NextFetchEvent, NextRequest } from 'next/server';

export function middleware(req: NextRequest, ev: NextFetchEvent) {
  console.log('Edit and run this at the edge!');
  console.log(req);
  console.log(ev);
}
