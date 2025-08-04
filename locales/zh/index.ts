import home from './home.json' with { type: 'json' };
import sidebar from './sidebar.json' with { type: 'json' };
import crypto from './crypto.json' with { type: 'json' };
import generators from './generators.json' with { type: 'json' };
import converters from './converters.json' with { type: 'json' };
import web from './web.json' with { type: 'json' };
import developer from './developer.json' with { type: 'json' };
import math from './math.json' with { type: 'json' };
import measurement from './measurement.json' with { type: 'json' };

const translations = {
  ...home,
  ...sidebar,
  ...crypto,
  ...math,
  ...generators,
  ...converters,
  ...web,
  ...developer,
  ...measurement,
};

export default translations;
