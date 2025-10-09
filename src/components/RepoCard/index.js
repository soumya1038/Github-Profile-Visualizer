import {Link} from 'react-router-dom'
// import Languages from '../Languages'
import './index.css'

const RepoCard = props => {
  const {repositoryDetails} = props
  const {
    name,
    description,
    languages,
    stargazersCount,
    forksCount,
    owner,
  } = repositoryDetails

  return (
    <Link to={`/repositories/${name}`} className="repoLinkContainer">
      <div data-testid="repoItem" className="repo-item">
        <div className="repositoryItemContainer">
          <div className="repoHeaderContainer">
            <h1 className="repoItemHeading">{name}</h1>
            <img
              src={owner.avatar_url}
              alt={`repository ${name}`}
              className="repoAvatarUrl"
            />
          </div>

          <p className="repoItemDesc">{description}</p>
          <div className="languagesListContainer">
            {languages.map(eachLanguage => {
              const colors = ['style1', 'style2', 'style3', 'style4', 'style5']
              const color = `${
                colors[Math.ceil(Math.random() * colors.length - 1)]
              }`
              return (
                <div className={`language ${color}`} key={eachLanguage.value}>
                  <p>{eachLanguage.name}</p>
                </div>
              )
            })}
          </div>
          <div className="repoCountContainer">
            <div className="starContainer">
              <img
                src="https://res.cloudinary.com/ddsn9feta/image/upload/v1719294440/Star_-_16px.1_cpjsj4.png"
                alt="star"
                className="start-image"
              />
              <p className="repoItemStar">{stargazersCount}</p>
            </div>
            <div className="forksContainer">
              <img
                src="https://res.cloudinary.com/ddsn9feta/image/upload/v1719294440/Git_3_w5zp4b.png"
                alt="git"
                className="git-image"
              />
              <p className="repoItemForks">{forksCount} </p>
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}
export default RepoCard
