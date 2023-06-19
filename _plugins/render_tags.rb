module Jekyll
  module RenderTags
    @@keys = ["platform", "store", "status", "franchise", "genre"]
    @@keys_chinese = ["平台", "商店", "状态", "系列", "类型"]
    def render_tags(posts)
      tags = Hash.new(0)
      @@keys.each do |key|
        _ = Hash.new(0)
        posts.each do |post|
          if post[key] then
            _[post[key]] += 1
          end
        end
        tags[key] = Hash.new(0)
        keys = _.keys.sort {|a, b| _[b] <=> _[a]}
        keys.each do |k|
          tags[key][k] = _[k]
        end
      end
      return tags
    end

    def get_tag_keys(_)
      return @@keys
    end

    def get_tag_keys_chinese(_)
      return @@keys_chinese
    end
  end
end

Liquid::Template.register_filter(Jekyll::RenderTags)
