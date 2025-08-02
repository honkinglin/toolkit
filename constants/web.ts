import {
  Globe,
  Code,
  FileText,
  Link,
  Search,
  Smartphone,
  Type,
  Users,
  Eye,
  Key,
  Binary,
  Tag,
  Settings,
  Database,
  Mail,
} from 'lucide-react';

export const WEB_ROUTES = {
  URL_ENCODER_DECODER: '/url-encoder-decoder',
  HTML_ENTITIES: '/html-entities',
  URI_PARSER: '/uri-parser',
  DEVICE_INFO: '/device-info',
  BASIC_AUTH_GENERATOR: '/basic-auth-generator',
  OPEN_GRAPH_GENERATOR: '/open-graph-generator',
  OTP_CODE_GENERATOR: '/otp-code-generator',
  MIME_TYPES: '/mime-types',
  JWT_PARSER: '/jwt-parser',
  KEYCODE_INFO: '/keycode-info',
  UNICODE_CHAR_CODES: '/unicode-char-codes',
  HTML_WYSIWYG_EDITOR: '/html-wysiwyg-editor',
  USER_AGENT_PARSER: '/user-agent-parser',
  HTTP_STATUS_CODES: '/http-status-codes',
  JSON_DIFF: '/json-diff',
  OUTLOOK_SAFELINK_DECODER: '/outlook-safelink-decoder',
};

export const webNavigationConfig = {
  titleKey: 'web',
  url: '#',
  icon: Globe,
  items: [
    {
      titleKey: 'urlEncoderDecoder',
      url: WEB_ROUTES.URL_ENCODER_DECODER,
      icon: Link,
    },
    {
      titleKey: 'htmlEntities',
      url: WEB_ROUTES.HTML_ENTITIES,
      icon: Code,
    },
    {
      titleKey: 'uriParser',
      url: WEB_ROUTES.URI_PARSER,
      icon: Search,
    },
    {
      titleKey: 'deviceInfo',
      url: WEB_ROUTES.DEVICE_INFO,
      icon: Smartphone,
    },
    {
      titleKey: 'basicAuthGenerator',
      url: WEB_ROUTES.BASIC_AUTH_GENERATOR,
      icon: Key,
    },
    {
      titleKey: 'openGraphGenerator',
      url: WEB_ROUTES.OPEN_GRAPH_GENERATOR,
      icon: Tag,
    },
    {
      titleKey: 'otpCodeGenerator',
      url: WEB_ROUTES.OTP_CODE_GENERATOR,
      icon: Binary,
    },
    {
      titleKey: 'mimeTypes',
      url: WEB_ROUTES.MIME_TYPES,
      icon: FileText,
    },
    {
      titleKey: 'jwtParser',
      url: WEB_ROUTES.JWT_PARSER,
      icon: Settings,
    },
    {
      titleKey: 'keycodeInfo',
      url: WEB_ROUTES.KEYCODE_INFO,
      icon: Type,
    },
    {
      titleKey: 'unicodeCharCodes',
      url: WEB_ROUTES.UNICODE_CHAR_CODES,
      icon: Binary,
    },
    {
      titleKey: 'htmlWysiwygEditor',
      url: WEB_ROUTES.HTML_WYSIWYG_EDITOR,
      icon: Eye,
    },
    {
      titleKey: 'userAgentParser',
      url: WEB_ROUTES.USER_AGENT_PARSER,
      icon: Users,
    },
    {
      titleKey: 'httpStatusCodes',
      url: WEB_ROUTES.HTTP_STATUS_CODES,
      icon: Database,
    },
    {
      titleKey: 'jsonDiff',
      url: WEB_ROUTES.JSON_DIFF,
      icon: Search,
    },
    {
      titleKey: 'outlookSafelinkDecoder',
      url: WEB_ROUTES.OUTLOOK_SAFELINK_DECODER,
      icon: Mail,
    },
  ],
};
