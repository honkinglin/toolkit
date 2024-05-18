import {
  Calendar,
  ArrowRightLeft,
  Type,
  FileText,
  Image,
  Palette,
  Globe,
  Code,
  Code2,
  Braces,
  List,
  FileCode,
  FileX,
  Hash,
} from 'lucide-react';

export const CONVERTER_ROUTES = {
  DATE_TIME_CONVERTER: '/date-time-converter',
  INTEGER_BASE_CONVERTER: '/integer-base-converter',
  ROMAN_NUMERAL_CONVERTER: '/roman-numeral-converter',
  BASE64_STRING_ENCODE_DECODE: '/base64-string-encode-decode',
  BASE64_FILE_CONVERTER: '/base64-file-converter',
  COLOR_PICKER: '/color-picker',
  CASE_CONVERTER: '/case-converter',
  TEXT_TO_NATO_ALPHABET: '/text-to-nato-alphabet',
  TEXT_TO_ASCII_BINARY: '/text-to-ascii-binary',
  TEXT_TO_UNICODE: '/text-to-unicode',
  YAML_TO_JSON: '/yaml-to-json',
  YAML_TO_TOML: '/yaml-to-toml',
  JSON_TO_YAML: '/json-to-yaml',
  JSON_TO_TOML: '/json-to-toml',
  LIST_CONVERTER: '/list-converter',
  TOML_TO_JSON: '/toml-to-json',
  TOML_TO_YAML: '/toml-to-yaml',
  XML_TO_JSON: '/xml-to-json',
  JSON_TO_XML: '/json-to-xml',
  MARKDOWN_TO_HTML: '/markdown-to-html',
};

export const converterNavigationConfig = {
  titleKey: 'converter',
  url: '#',
  icon: ArrowRightLeft,
  items: [
    {
      titleKey: 'dateTimeConverter',
      url: CONVERTER_ROUTES.DATE_TIME_CONVERTER,
      icon: Calendar,
    },
    {
      titleKey: 'integerBaseConverter',
      url: CONVERTER_ROUTES.INTEGER_BASE_CONVERTER,
      icon: Hash,
    },
    {
      titleKey: 'romanNumeralConverter',
      url: CONVERTER_ROUTES.ROMAN_NUMERAL_CONVERTER,
      icon: Type,
    },
    {
      titleKey: 'base64StringEncodeDecode',
      url: CONVERTER_ROUTES.BASE64_STRING_ENCODE_DECODE,
      icon: FileText,
    },
    {
      titleKey: 'base64FileConverter',
      url: CONVERTER_ROUTES.BASE64_FILE_CONVERTER,
      icon: Image,
    },
    {
      titleKey: 'colorPicker',
      url: CONVERTER_ROUTES.COLOR_PICKER,
      icon: Palette,
    },
    {
      titleKey: 'caseConverter',
      url: CONVERTER_ROUTES.CASE_CONVERTER,
      icon: Type,
    },
    {
      titleKey: 'textToNatoAlphabet',
      url: CONVERTER_ROUTES.TEXT_TO_NATO_ALPHABET,
      icon: Globe,
    },
    {
      titleKey: 'textToAsciiBinary',
      url: CONVERTER_ROUTES.TEXT_TO_ASCII_BINARY,
      icon: Code,
    },
    {
      titleKey: 'textToUnicode',
      url: CONVERTER_ROUTES.TEXT_TO_UNICODE,
      icon: Code2,
    },
    {
      titleKey: 'yamlToJson',
      url: CONVERTER_ROUTES.YAML_TO_JSON,
      icon: Braces,
    },
    {
      titleKey: 'yamlToToml',
      url: CONVERTER_ROUTES.YAML_TO_TOML,
      icon: FileCode,
    },
    {
      titleKey: 'jsonToYaml',
      url: CONVERTER_ROUTES.JSON_TO_YAML,
      icon: Braces,
    },
    {
      titleKey: 'jsonToToml',
      url: CONVERTER_ROUTES.JSON_TO_TOML,
      icon: FileCode,
    },
    {
      titleKey: 'listConverter',
      url: CONVERTER_ROUTES.LIST_CONVERTER,
      icon: List,
    },
    {
      titleKey: 'tomlToJson',
      url: CONVERTER_ROUTES.TOML_TO_JSON,
      icon: FileCode,
    },
    {
      titleKey: 'tomlToYaml',
      url: CONVERTER_ROUTES.TOML_TO_YAML,
      icon: FileCode,
    },
    {
      titleKey: 'xmlToJson',
      url: CONVERTER_ROUTES.XML_TO_JSON,
      icon: FileX,
    },
    {
      titleKey: 'jsonToXml',
      url: CONVERTER_ROUTES.JSON_TO_XML,
      icon: FileX,
    },
    {
      titleKey: 'markdownToHtml',
      url: CONVERTER_ROUTES.MARKDOWN_TO_HTML,
      icon: FileText,
    },
  ],
};
