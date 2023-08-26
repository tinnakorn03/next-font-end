 
type ThemeConfig = { 
  templateName: string 
  responsiveFontSizes: boolean 
  layout: 'vertical' | 'horizontal' 
}

const themeConfig: ThemeConfig = { 
  templateName: 'Test',
  responsiveFontSizes: true,
  layout: 'vertical' 
}

export default themeConfig
