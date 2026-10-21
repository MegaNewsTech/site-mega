import type { CSSProperties } from 'react'
import iconFlex from '@/assets/products/icons/mega-flex.svg'
import iconAdmPower from '@/assets/products/icons/admpower.svg'
import iconAgil from '@/assets/products/icons/mega-agil.svg'
import iconPosto from '@/assets/products/icons/mega-posto.svg'
import fullFlex from '@/assets/products/full/mega-flex-gestao.svg'
import fullAdmPower from '@/assets/products/full/admpower.svg'
import { assetSrc } from '@/lib/asset'

export type ProductResource = {
  title: string
  text: string
  items: string[]
}

type ProductTheme = {
  /** Card border, ribbon, list icons and "Saiba mais" */
  accent: string
  /** Eyebrow and category label text (darker for contrast on white) */
  accentText: string
  /** "Falar com a equipe" button */
  button: string
  /** Product page logo frame border and band */
  frame: string
  band: string
  bandText: string
  /** Category pill on the product page logo frame */
  pillBg: string
  pillBorder: string
  pillText: string
}

export type Product = {
  slug: string
  name: string
  /** Ribbon on the home card and label on the "Conheça também" cards */
  category: string
  /** Pill on the product page logo frame */
  pillLabel: string
  icon: string
  /** Icon height in px on the cards (some SVGs carry inner padding) */
  iconHeight?: number
  logo: string
  /** Logo height in px on the product page frame */
  logoHeight?: number
  cardText: string
  cardItems: string[]
  shortText: string
  bandText: string
  headline: string
  intro: string
  resources: ProductResource[]
  ctaTitle: string
  ctaText: string
  theme: ProductTheme
}

export const products: Product[] = [
  {
    slug: 'mega-flex-gestao',
    name: 'Mega Flex Gestão',
    category: 'Fiscal',
    pillLabel: 'Fiscal',
    icon: assetSrc(iconFlex),
    iconHeight: 84,
    logo: assetSrc(fullFlex),
    cardText:
      'Mega Flex Gestão: ERP fiscal com NF-e, SPED Fiscal/Contribuições, Manifestação do Destinatário, inventário de estoque, fluxo de caixa, contas a pagar e a receber.',
    cardItems: [
      'Mega Flex PDV',
      'Nota Fiscal Eletrônica',
      'Nota Fiscal a Consumidor',
      'SPED Fiscal',
      'SPED Contribuições',
    ],
    shortText: 'ERP fiscal, estoque e financeiro.',
    bandText:
      'ERP fiscal com NF-e, SPED Fiscal e Contribuições, Manifestação do Destinatário, inventário de estoque, fluxo de caixa e contas a pagar e a receber.',
    headline: 'Gestão com foco na sua rotina fiscal.',
    intro:
      'O Mega Flex Gestão reúne recursos fiscais e controles essenciais do negócio. Da emissão de notas ao inventário de estoque, do fluxo de caixa às contas a pagar e a receber, os principais controles ficam reunidos em um só sistema.',
    resources: [
      {
        title: 'Fiscal e documentos',
        text: 'Recursos para emissão e acompanhamento dos documentos fiscais.',
        items: ['Nota Fiscal Eletrônica (NF-e)', 'Nota Fiscal a Consumidor', 'Manifestação do Destinatário'],
      },
      {
        title: 'Escrituração fiscal',
        text: 'Recursos de escrituração que fazem parte do foco fiscal do ERP.',
        items: ['SPED Fiscal', 'SPED Contribuições'],
      },
      {
        title: 'Controle do negócio',
        text: 'Estoque e financeiro junto aos recursos do Mega Flex PDV.',
        items: ['Mega Flex PDV', 'Inventário de estoque', 'Fluxo de caixa', 'Contas a pagar e a receber'],
      },
    ],
    ctaTitle: 'Conheça o Mega Flex Gestão de perto.',
    ctaText: 'Converse com a Mega News e conheça o Mega Flex Gestão em uma demonstração.',
    theme: {
      accent: '#ef4444',
      accentText: '#dc2626',
      button: '#c9373d',
      frame: '#1ba3e3',
      band: '#1f72ba',
      bandText: '#ffffff',
      pillBg: '#ef4444',
      pillBorder: '#ef4444',
      pillText: '#ffffff',
    },
  },
  {
    slug: 'admpower',
    name: 'AdmPower',
    category: 'Gerencial',
    pillLabel: 'Gerencial',
    icon: assetSrc(iconAdmPower),
    logo: assetSrc(fullAdmPower),
    cardText:
      'AdmPower: sistema de gestão de pedidos, estoque e controle financeiro, com integração ao aplicativo de vendas externas Mega Ágil.',
    cardItems: [
      'Lançamento de pedidos',
      'Controle de estoque',
      'Gestão financeira',
      'Integração com o Mega Ágil',
      'Relatórios personalizados',
    ],
    shortText: 'Pedidos, estoque e gestão financeira.',
    bandText:
      'Sistema de gestão de pedidos, estoque e controle financeiro, com integração ao aplicativo de vendas externas Mega Ágil e relatórios personalizados.',
    headline: 'Pedidos, estoque e financeiro sob o mesmo olhar.',
    intro:
      'O AdmPower reúne a gestão de pedidos, o controle de estoque e a gestão financeira. A integração com o Mega Ágil conecta o sistema ao aplicativo de vendas externas, aproximando a gestão interna da atuação da equipe em campo.',
    resources: [
      {
        title: 'Rotina gerencial',
        text: 'Recursos para cuidar dos pedidos e do estoque do seu negócio.',
        items: ['Lançamento de pedidos', 'Controle de estoque'],
      },
      {
        title: 'Financeiro e relatórios',
        text: 'Controle financeiro e relatórios para acompanhar a gestão.',
        items: ['Gestão financeira', 'Relatórios personalizados'],
      },
      {
        title: 'Conexão com a venda externa',
        text: 'O AdmPower se integra ao aplicativo de força de vendas Mega Ágil.',
        items: ['Integração com o Mega Ágil', 'Sincronização entre as plataformas'],
      },
    ],
    ctaTitle: 'Vamos conversar sobre a sua gestão?',
    ctaText: 'Converse com a Mega News e conheça o AdmPower em uma demonstração.',
    theme: {
      accent: '#f5a30f',
      accentText: '#9a7300',
      button: '#f5a30f',
      frame: '#f5a30f',
      band: '#f5a30f',
      bandText: '#1a1a1a',
      pillBg: '#fdf1dc',
      pillBorder: '#e5b567',
      pillText: '#8a6500',
    },
  },
  {
    slug: 'mega-agil',
    name: 'Mega Ágil',
    category: 'Venda Externa',
    pillLabel: 'Venda Externa',
    icon: assetSrc(iconAgil),
    logo: assetSrc(iconAgil),
    logoHeight: 125,
    cardText:
      'Mega Ágil: aplicativo de força de vendas para venda externa, com integração direta ao AdmPower e sincronização entre as plataformas. Pode funcionar offline e é muito fácil de usar.',
    cardItems: [
      'Força de vendas',
      'Integração com o AdmPower',
      'Funcionamento offline',
      'Facilidade de uso',
      'Mobilidade',
    ],
    shortText: 'Mobilidade para a força de vendas.',
    bandText:
      'Aplicativo para venda externa, com integração direta ao AdmPower e sincronização entre as plataformas. Pode funcionar offline e é muito fácil de usar.',
    headline: 'A venda externa acompanha a sua equipe.',
    intro:
      'O Mega Ágil é o aplicativo de força de vendas da Mega News. Sua proposta combina mobilidade e facilidade de uso para a venda externa, com integração direta ao AdmPower e sincronização entre as duas plataformas. O aplicativo também pode funcionar offline.',
    resources: [
      {
        title: 'Venda em movimento',
        text: 'Um aplicativo voltado à atuação da equipe de vendas externas.',
        items: ['Força de vendas', 'Mobilidade'],
      },
      {
        title: 'Conexão com a gestão',
        text: 'Integração direta com o AdmPower para conectar as plataformas.',
        items: ['Integração com o AdmPower', 'Sincronização entre as plataformas'],
      },
      {
        title: 'Uso no dia a dia',
        text: 'Facilidade de uso para a rotina de quem trabalha em campo.',
        items: ['Facilidade de uso', 'Pode funcionar offline'],
      },
    ],
    ctaTitle: 'Leve o Mega Ágil para a conversa.',
    ctaText: 'Converse com a Mega News e conheça o Mega Ágil em uma demonstração.',
    theme: {
      accent: '#0b63f6',
      accentText: '#1458c9',
      button: '#1d5fcb',
      frame: '#034c8c',
      band: '#034c8c',
      bandText: '#ffffff',
      pillBg: '#eaf2fc',
      pillBorder: '#034c8c',
      pillText: '#034c8c',
    },
  },
  {
    slug: 'mega-posto',
    name: 'Mega Posto',
    category: 'Posto Combustível',
    pillLabel: 'Postos de Combustíveis',
    icon: assetSrc(iconPosto),
    logo: assetSrc(iconPosto),
    logoHeight: 165,
    cardText:
      'O Mega Posto é um sistema para postos de combustíveis, com controle de bombas, abastecimentos, relatórios LMC e emissão de NF-e (mod. 55) e NFC-e (mod. 65).',
    cardItems: [
      'NF-e (mod. 55)',
      'NFC-e (mod. 65)',
      'LMC, Gestão de Combustível',
      'SPED Fiscal',
      'SPED Contribuições',
    ],
    shortText: 'Gestão para postos de combustíveis.',
    bandText:
      'Sistema para postos de combustíveis, com controle de bombas, abastecimentos, relatórios LMC e emissão de NF-e (mod. 55) e NFC-e (mod. 65).',
    headline: 'Do abastecimento aos documentos fiscais.',
    intro:
      'O Mega Posto é uma solução para a gestão de postos de combustíveis. Reúne o controle de bombas e abastecimentos, a gestão de combustível e os relatórios LMC, além da emissão fiscal nos modelos 55 e 65 e dos recursos de SPED Fiscal e Contribuições.',
    resources: [
      {
        title: 'Operação do posto',
        text: 'Controles voltados à rotina de combustíveis e abastecimentos.',
        items: ['Controle de bombas', 'Controle de abastecimentos', 'Gestão de Combustível'],
      },
      {
        title: 'Emissão de documentos',
        text: 'Emissão fiscal com os modelos de documentos do Mega Posto.',
        items: ['NF-e (mod. 55)', 'NFC-e (mod. 65)'],
      },
      {
        title: 'Relatórios e escrituração',
        text: 'Recursos de acompanhamento e escrituração fiscal do posto.',
        items: ['Relatórios LMC', 'SPED Fiscal', 'SPED Contribuições'],
      },
    ],
    ctaTitle: 'Conheça uma gestão feita para postos.',
    ctaText: 'Converse com a Mega News e conheça o Mega Posto em uma demonstração.',
    theme: {
      accent: '#0e8a5f',
      accentText: '#0e7f55',
      button: '#0d7a55',
      frame: '#053f6b',
      band: '#053f6b',
      bandText: '#ffffff',
      pillBg: '#eaf2fc',
      pillBorder: '#053f6b',
      pillText: '#053f6b',
    },
  },
]

export const productHref = (product: Product) => `/produtos/${product.slug}`

export const findProduct = (slug: string) => products.find((p) => p.slug === slug)

/** Exposes the product theme as CSS custom properties (--accent, --band, …). */
export function themeVars(product: Product): CSSProperties {
  const { theme } = product
  return {
    '--accent': theme.accent,
    '--accent-text': theme.accentText,
    '--button': theme.button,
    '--frame': theme.frame,
    '--band': theme.band,
    '--band-text': theme.bandText,
    '--pill-bg': theme.pillBg,
    '--pill-border': theme.pillBorder,
    '--pill-text': theme.pillText,
    '--icon-height': `${product.iconHeight ?? 64}px`,
    '--logo-height': `${product.logoHeight ?? 200}px`,
  } as CSSProperties
}
