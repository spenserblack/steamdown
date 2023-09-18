import type { Plugin } from 'unified';
import { visit } from 'unist-util-visit';
import { is } from 'unist-util-is';

export const steamify: Plugin =  function steamify() {
  return (tree, file) => {
    console.log('steamify: tree type:', tree.type);
  };
}
