import { sampleBranches } from "../assests/constants";
export const branchservice = value => {
  console.info("hi in service");
  return fetch(`https://api.github.com/repos/jainkunal40/${value}/branches`)
    .then(response => {
      if (!response.ok) {
        throw Error(response.statusText);
      }
      response.json();
    })
    .then(branches => {
      return branches.map(branch => {
        return {
          key: branch.name,
          value: branch.name,
          text: branch.name
        };
      });
    })
    .catch(error => {
      console.info("in error");
      return sampleBranches.map(branch => {
        return {
          key: branch.name,
          value: branch.name,
          text: branch.name
        };
      });
    });
};
