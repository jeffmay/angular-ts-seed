/** All library references managed through TSD */
/// <reference path="../typings/tsd.d.ts" />

/** Utility modules */
/// <reference path="util/assert.ts" />

/** The models package (unordered) */
/// <reference path="models/base-models.ts" />
/// <reference path="models/common-models.ts" />
/// <reference path="models/task-models.ts" />
/// <reference path="models/user-models.ts" />

/** Managed references (unordered) */
//grunt-start
/// <reference path="partials/home.html.ts" />
/// <reference path="partials/tasklist.html.ts" />
/// <reference path="controllers/task-controllers.ts" />
/// <reference path="directives/common-directives.ts" />
/// <reference path="services/uuid-generator.ts" />
//grunt-end

/** Angular module dependencies
*
* Note: These references must be
*/
/* (ordered) */
/// <reference path="modules/common-services.ts" />
/// <reference path="modules/main.ts" />

/** Bootstrap application */
/// <reference path="boot.ts" />
