import renderer from "react-test-renderer";
import { Circle } from "./circle";
import { ElementStates } from "../../../types/element-states";

describe("Testing the Circle Component", () => {

  it("should be a valid empty circle display", () => {
    const tree = renderer.create(<Circle />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("should be a correct display of a circle with letters", () => {
    const tree = renderer.create(<Circle letter="test" />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("should be a correct display of the circle with head", () => {
    const tree = renderer.create(<Circle head="test" />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("should be a correct display of a circle with a react element in the head", () => {
    const tree = renderer.create(<Circle head={<Circle />} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("should be a correct display of the circle with tail", () => {
    const tree = renderer.create(<Circle tail="test" />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("should be a correct display of a circle with a react element in the tail", () => {
    const tree = renderer.create(<Circle tail={<Circle />} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("should be a correct display of the circle with index", () => {
    const tree = renderer.create(<Circle index={0} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("should be a correct display of the circle with the prop isSmall === true", () => {
    const tree = renderer.create(<Circle isSmall={true} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("should be a correct display of the circle in the default state", () => {
    const tree = renderer.create(<Circle state={ElementStates.Default} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("should be a correct display of the circle in the changing state", () => {
    const tree = renderer.create(<Circle state={ElementStates.Changing} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("should be a correct display of the circle in the modified state", () => {
    const tree = renderer.create(<Circle state={ElementStates.Modified} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
