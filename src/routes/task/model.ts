import { sql } from "kysely";
import { db } from "../../database/database.ts";
// interface CombinedResult {
//   // Properties from OfferwallTasks
//   name: string;
//   description: string | null;
//   instructions: string | null;
//   id: number;
//   network: string;
//   offer_id: string;
//   task_category_id: number;
//   image: string | null;
//   url: string;
//   countries: string | null;
//   platforms: string | null;
//   status: "draft" | "publish" | "trash" | null;
//   payout: number;
//   is_featured: number;
//   goals_count: number;
//   network_goals: string | null;

//   // Properties from OfferwallNetworks
//   code: string;
//   network_name: string;
//   logo: string | null;

//   // Properties from OfferwallCategories
//   category_id: number;
//   category_icon: string | null;
//   category_name: string;
//   bg_color: string | null;
//   sort_order: number;
// }
export const fetch = async (
  countries: string[] | null,
  pageNumber: number | null,
  limit: number | null,
  platform: string[] | null,
  featured: boolean | null,
  network: string | null,
  category: number | null
) => {
  // Query:

  const result = sql<any>`SELECT
    offerwall_tasks.name AS Name,
    offerwall_tasks.description,
    offerwall_tasks.instructions,
    offerwall_tasks.id AS ID,
    offerwall_tasks.network,
    offerwall_tasks.offer_id,
    offerwall_tasks.category_id,
    offerwall_tasks.image,
    offerwall_tasks.url,
    offerwall_tasks.countries,
    offerwall_tasks.platforms,
    offerwall_tasks.status,
    offerwall_tasks.payout,
    offerwall_tasks.is_featured,
    offerwall_tasks.goals_count,
    offerwall_tasks.network_goals,
    offerwall_networks.code,
    offerwall_networks.name,
    offerwall_networks.logo,
    offerwall_categories.id AS category_id,
    offerwall_categories.icon,
    offerwall_categories.name AS category_name,
    offerwall_categories.bg_color,
    offerwall_categories.sort_order
  FROM
    offerwall_tasks,
    offerwall_networks,
    offerwall_categories
    WHERE
    offerwall_tasks.category_id=offerwall_categories.id
    AND  offerwall_tasks.network=offerwall_networks.code
    AND  offerwall_networks.type='tasks'
    AND (${network ? sql`offerwall_tasks.network=${network}` : sql`1`})
    AND (${featured ? sql`offerwall_tasks.is_featured=${featured}` : sql`1`})
    AND (${category ? sql`offerwall_tasks.category_id=${category}` : sql`1`})
    AND (${
      countries && typeof countries != undefined
        ? sql`JSON_CONTAINS(offerwall_tasks.countries, JSON_ARRAY(${countries}))`
        : sql`1`
    })
    AND (${
      platform && typeof platform != undefined
        ? sql`JSON_CONTAINS(offerwall_tasks.platforms, JSON_ARRAY(${platform}))`
        : sql`1`
    })

    ${
      pageNumber != null
        ? sql`LIMIT ${limit != null ? limit : 20} OFFSET ${
            (pageNumber - 1) * (limit != null ? limit : 20)
          }`
        : sql``
    };`.execute(db);

  return result;

  // Error with kysely fucntions
  // const query = db
  //   .selectFrom("offerwall_tasks")
  //   .innerJoin(
  //     "offerwall_networks",
  //     "offerwall_tasks.network",
  //     "offerwall_networks.id"
  //   )
  //   .innerJoin(
  //     "offerwall_categories",
  //     "offerwall_tasks.category_id",
  //     "offerwall_categories.id"
  //   )
  //   .select([
  //     "offerwall_tasks.name as Name",
  //     "offerwall_tasks.description",
  //     "offerwall_tasks.instructions",
  //     "offerwall_tasks.id as ID",
  //     "offerwall_tasks.network",
  //     "offerwall_tasks.offer_id",
  //     "offerwall_tasks.category_id",
  //     "offerwall_tasks.image",
  //     "offerwall_tasks.url",
  //     "offerwall_tasks.countries",
  //     "offerwall_tasks.platforms",
  //     "offerwall_tasks.status",
  //     "offerwall_tasks.payout",
  //     "offerwall_tasks.is_featured",
  //     "offerwall_tasks.goals_count",
  //     "offerwall_tasks.network_goals",
  //     "offerwall_networks.code",
  //     "offerwall_networks.name",
  //     "offerwall_networks.logo",
  //     "offerwall_categories.id as category_id",
  //     "offerwall_categories.icon",
  //     "offerwall_categories.name as category_name",
  //     "offerwall_categories.bg_color",
  //     "offerwall_categories.sort_order",
  //   ])
  //   .where(
  //     sql`JSON_CONTAINS(offerwall_tasks.countries, JSON_ARRAY(${countries[0]})}))`
  //   )
  //   .limit(limit ?? 20)
  //   .execute();

  // return query;
};
