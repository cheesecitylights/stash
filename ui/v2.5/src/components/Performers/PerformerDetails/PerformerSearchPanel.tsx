import axios from "axios";
import React from "react";
import { useHistory } from "react-router-dom";
import { SceneCard } from "src/components/Scenes/SceneCard";
import { Search } from "src/components/Search/Search";
import * as GQL from "src/core/generated-graphql";
import { performerFilterHook } from "src/core/performers";
import { genderToString } from "src/utils/gender";

interface IPerformerDetails {
  performer: Partial<GQL.PerformerDataFragment>;//String;//GQL.PerformerDataFragment; //GQL.PerformerDataFragment;
}

export const PerformerSearchPanel: React.FC<IPerformerDetails> = ({
  performer,
}) => {
  /*GQL.useScrapeSingleSceneLazyQuery(
    ScrapeSingleSceneQueryVariables
  )*/
  const initialValues = {
    name: performer.name ?? "",
    aliases: performer.aliases ?? "",
    gender: genderToString(performer.gender ?? undefined),
    birthdate: performer.birthdate ?? "",
    ethnicity: performer.ethnicity ?? "",
    eye_color: performer.eye_color ?? "",
    country: performer.country ?? "",
    height: performer.height ?? "",
    measurements: performer.measurements ?? "",
    fake_tits: performer.fake_tits ?? "",
    career_length: performer.career_length ?? "",
    tattoos: performer.tattoos ?? "",
    piercings: performer.piercings ?? "",
    url: performer.url ?? "",
    twitter: performer.twitter ?? "",
    instagram: performer.instagram ?? "",
    tag_ids: (performer.tags ?? []).map((t) => t.id),
    stash_ids: performer.stash_ids ?? undefined,
    image: undefined,
    details: performer.details ?? "",
    death_date: performer.death_date ?? "",
    hair_color: performer.hair_color ?? "",
    weight: performer.weight ?? undefined,
  };
  
  type InputValues = typeof initialValues;

  const { data, loading, error } = GQL.useScrapeSingleSceneQuery({
    variables: {
      source: {
        "stash_box_index": 0
      },
      input: {
        "query": initialValues.name
      },
    },
  });
  
  //data?.scrapeSingleScene.map((scene, index) => ()
  return (
    <div className="row justify-content-center">
      {data?.scrapeSingleScene.map((scene, index) => (
        <div draggable="false" className="scene-card zoom-1 grid-card card">
        <input type="checkbox" className="card-check form-control"></input>
        <div className="video-section thumbnail-section">
            <a className="scene-card-link" href={scene?.url!}>
                <div className="scene-card-preview">
                    <img className="scene-card-preview-image" src={scene?.image!} alt=""/>
                </div>
                {/* <div className="scene-specs-overlay">{scene.fingerprints?.map((sc) => sc.duration)}</div> */}
            </a>
        </div>
        <div className="card-section">
            <a href={scene?.url!}>
                <h5 className="card-section-title">
                    <div className="TruncatedText" >{scene.title}</div>
                    <h6>{scene?.studio?.name}</h6>
                </h5>
            </a>
        </div>
    </div>      
        
        //<SceneCard
        //  //key={scene.id}
        //  scene= {GQL.SlimSceneDataFragmentDoc({
        //    variables: {
        //      id: scene.remote_site_id,
        //      title: scene.title,
        //      details: scene.details,
        //      url: scene.url,
        //      data: scene.date      map((fingerprint) => fingerprint.duration)
        //    }
        //  })}
        //  //{ "Scene", {scene.remote_site_id}  }
        //  //queue={queue}
        //  index={index}
        //  //zoomIndex={zoomIndex}
        //  //selecting={selectedIds.size > 0}
        //  //selected={selectedIds.has(scene.id)}
        // // onSelectedChanged={(selected: boolean, shiftKey: boolean) =>
        //  //  onSelectChange(scene.id, selected, shiftKey)
        //  //}
        ///>
      ))}
    </div>
  );

  /* const vttPath = base + "/performe"
  const response = axios.get<string>(vttPath, { responseType: "text" });
  const history = useHistory();
  return <Search filterHook={performerFilterHook(performer)} />; */
};



/* f6b78068-fe08-4c00-b967-ce893121f168
 */

