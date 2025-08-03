import home from './home.json' with { type: 'json' };
import sidebar from './sidebar.json' with { type: 'json' };
import crypto from './crypto.json' with { type: 'json' };
import generators from './generators.json' with { type: 'json' };
import converters from './converters.json' with { type: 'json' };
import web from './web.json' with { type: 'json' };
import developer from './developer.json' with { type: 'json' };

const en = {
  ...home,
  ...sidebar,
  ...crypto,
  ...generators,
  ...converters,
  ...web,
  ...developer,
};

export default en;
