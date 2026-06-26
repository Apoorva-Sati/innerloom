'use client'

import { visionTool } from '@sanity/vision'
import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { apiVersion, dataset, projectId } from './src/sanity/env'
import post from './src/sanity/schemas/post'
import category from './src/sanity/schemas/category'

export default defineConfig({
  basePath: '/studio',
  projectId,
  dataset,
  schema: {
    types: [post, category],
  },
  plugins: [
    structureTool(),
    visionTool({ defaultApiVersion: apiVersion }),
  ],
})